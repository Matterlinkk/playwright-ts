import { faker } from "@faker-js/faker";

interface Booking {
  firstname: string | undefined;
  lastname: string | undefined;
  totalprice: number | undefined;
  depositpaid: boolean | undefined;
  bookingdates: {
    checkin: string | undefined;
    checkout: string | undefined;
  };
  additionalneeds: string | undefined;
}

class BookBuilder {
  private booking: Booking = {
    firstname: undefined,
    lastname: undefined,
    totalprice: undefined,
    depositpaid: undefined,
    bookingdates: {
      checkin: undefined,
      checkout: undefined,
    },
    additionalneeds: undefined,
  };

  private isValidDateFormat(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  }

  private findUndefinedFields(obj: Booking, prefix: string = ""): string[] {
    const undefinedFields: string[] = [];

    for (const key in obj) {
      const value = obj[key];
      const path = prefix ? `${prefix}.${key}` : key;

      if (value === undefined) {
        undefinedFields.push(path);
      } else if (typeof value === "object" && value !== null) {
        undefinedFields.push(...this.findUndefinedFields(value, path));
      }
    }

    return undefinedFields;
  }

  private doCheck() {
    return (
      this.booking.firstname !== undefined &&
      this.booking.lastname !== undefined &&
      this.booking.totalprice !== undefined &&
      this.booking.depositpaid !== undefined &&
      this.booking.bookingdates.checkin !== undefined &&
      this.booking.bookingdates.checkout !== undefined &&
      this.booking.additionalneeds !== undefined
    );
  }

  setFirstname(firstname: string) {
    this.booking.firstname = firstname;
    return this;
  }

  setLastname(lastname: string) {
    this.booking.lastname = lastname;
    return this;
  }

  setTotalPrice(totalprice: number) {
    this.booking.totalprice = totalprice;
    return this;
  }

  setDepositPaid(depositpaid: boolean) {
    this.booking.depositpaid = depositpaid;
    return this;
  }

  setBookingDates(checkinDate: string, checkoutDate: string) {
    if (
      this.isValidDateFormat(checkinDate) &&
      this.isValidDateFormat(checkoutDate)
    ) {
      this.booking.bookingdates = {
        checkin: checkinDate,
        checkout: checkoutDate,
      };
      return this;
    } else {
      throw new Error(
        `checkin: ${checkinDate}, checkout: ${checkoutDate}. Valid date format is YYYY-MM-DD`,
      );
    }
  }

  setAdditionalNeeds(additionalneeds: string) {
    this.booking.additionalneeds = additionalneeds;
    return this;
  }

  build() {
    if (this.doCheck()) {
      return this.booking as Booking;
    }
    throw new Error(
      `The entity is not valid, fill this field: ${[this.findUndefinedFields(this.booking)]}`,
    );
  }
}

function createRandomBooking() {
  return new BookBuilder()
    .setFirstname(faker.person.firstName())
    .setLastname(faker.person.lastName())
    .setTotalPrice(faker.number.int({ min: 50, max: 1000 }))
    .setDepositPaid(faker.datatype.boolean())
    .setBookingDates(
      faker.date.past().toISOString().split("T")[0],
      faker.date.future().toISOString().split("T")[0],
    )
    .setAdditionalNeeds(
      faker.helpers.arrayElement([
        "Breakfast",
        "Extra pillow",
        "Airport shuttle",
        "Late checkout",
      ]),
    )
    .build();
}

export { createRandomBooking, Booking };
