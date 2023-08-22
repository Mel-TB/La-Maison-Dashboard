import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

import { Button } from "../ui/button/Button.styles";
import supabase from "../lib/api/supabase";
import { subtractDates } from "../lib/utils/helpers";

const deleteGuests = async () => {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) {
    console.log(error.message);
  }
};

const deleteCabins = async () => {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) {
    console.log(error.message);
  }
};

const deleteBookings = async () => {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) {
    console.log(error.message);
  }
};

const createGuests = async () => {
  const { error } = await supabase.from("guest").insert(guests);
  if (error) {
    console.log(error.message);
  }
};

const createCabins = async () => {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) {
    console.log(error.message);
  }
};

const createBookings = async () => {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestIds } = await supabase
    .from("guest")
    .select("id")
    .order("id");
  const allGuestIds = guestIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabin_id - 1);
    const number_nights = subtractDates(booking.end_date, booking.start_date);
    const cabin_price = number_nights * (cabin.regular_price - cabin.discount);
    const extra = booking.has_breakfast
      ? number_nights * 15 * booking.number_guests
      : 0; // hardcoded breakfast price
    const total_price = cabin_price + extra;

    let status;
    if (
      isPast(new Date(booking.end_date)) &&
      !isToday(new Date(booking.end_date))
    ) {
      status = "checked-out";
    }
    if (
      isFuture(new Date(booking.start_date)) ||
      isToday(new Date(booking.start_date))
    ) {
      status = "unconfirmed";
    }
    if (
      (isFuture(new Date(booking.end_date)) ||
        isToday(new Date(booking.end_date))) &&
      isPast(new Date(booking.start_date)) &&
      !isToday(new Date(booking.start_date))
    ) {
      status = "checked-in";
    }

    return {
      ...booking,
      number_nights,
      cabin_price,
      extra,
      total_price,
      guest_id: allGuestIds.at(booking.guest_id - 1),
      cabin_id: allCabinIds.at(booking.cabin_id - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) {
    console.log(error.message);
  }
};

const Uploader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadAll = async () => {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  };

  const uploadBookings = async () => {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  };

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button
        onClick={uploadAll}
        disabled={isLoading}
      >
        Upload ALL
      </Button>

      <Button
        onClick={uploadBookings}
        disabled={isLoading}
      >
        Upload bookings ONLY
      </Button>
    </div>
  );
};

export default Uploader;
