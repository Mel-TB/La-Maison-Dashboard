import supabase, { supabaseUrl } from "./supabase";

export const fetchCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be fetched");
  }

  return data;
};

export const createUpdateCabin = async (newCabin, id) => {
  //* check image path
  const hasImagePath = newCabin?.image.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //* Create/ update cabin
  let query = supabase.from("cabins");

  //* A) Create new Cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //* B) Update existing Cabin
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  //* If successful upload image
  if (hasImagePath) {
    return data;
  }

  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //* Delete cabin IF there was upload error image
  if (imageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(imageError);
    throw new Error("Cabin image upload failed");
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
};

// https://wzlkbnddnhfrjuvmpizh.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
