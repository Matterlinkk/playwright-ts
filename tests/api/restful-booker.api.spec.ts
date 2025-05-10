import { expect, test } from "@playwright/test";
import { BookingClient } from "@api/clients/booking-clients";
import { createRandomBooking } from "@api/builders/restful-book-builder";
import * as dotenv from "dotenv";
import * as process from "process";

dotenv.config();

test.describe("Restful book api", () => {
  let authToken: string;
  let testBookingId: number;

  test.beforeEach(async ({ request }) => {
    const bookingClient = new BookingClient(request);
    authToken = await bookingClient.getToken(
      process.env.API_USERNAME,
      process.env.API_PASSWORD,
    );

    const booking = createRandomBooking();
    const createResponse = await bookingClient.createBooking(booking);
    const createdBooking = await createResponse.json();
    testBookingId = createdBooking.bookingid;
  });

  test.afterEach(async ({ request }) => {
    const bookingClient = new BookingClient(request);

    if (testBookingId) {
      try {
        await bookingClient.deleteBooking(testBookingId, authToken);
      } catch {
        console.warn(`Unable to delete the booking with ID ${testBookingId}`);
      }
    }
  });

  test("Get book id list test", async ({ request }) => {
    const bookingClient = new BookingClient(request);

    const response = await bookingClient.getBookings();
    expect(response.status()).toBe(200);

    const bookIdList = await response.json();
    expect(bookIdList.length).toBeGreaterThan(0);

    if (bookIdList.length > 0) {
      expect(bookIdList[0]).toHaveProperty("bookingid");
    }
  });

  test("Create and retrieve a booking", async ({ request }) => {
    const bookingClient = new BookingClient(request);
    const booking = createRandomBooking();

    const createResponse = await bookingClient.createBooking(booking);
    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();
    expect(createdBooking).toHaveProperty("bookingid");
    expect(typeof createdBooking.bookingid).toBe("number");

    const getResponse = await bookingClient.getBookingById(
      createdBooking.bookingid,
    );
    expect(getResponse.status()).toBe(200);

    const bookingDetails = await getResponse.json();

    expect(bookingDetails.firstname).toBe(booking.firstname);
    expect(bookingDetails.lastname).toBe(booking.lastname);
    expect(bookingDetails.totalprice).toBe(booking.totalprice);
    expect(bookingDetails.depositpaid).toBe(booking.depositpaid);
    expect(bookingDetails.bookingdates.checkin).toBe(
      booking.bookingdates.checkin,
    );
    expect(bookingDetails.bookingdates.checkout).toBe(
      booking.bookingdates.checkout,
    );
    expect(bookingDetails.additionalneeds).toBe(booking.additionalneeds);
  });

  test("Update a booking", async ({ request }) => {
    const bookingClient = new BookingClient(request);
    const originalBooking = createRandomBooking();

    const createResponse = await bookingClient.createBooking(originalBooking);
    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();

    const updatedBooking = createRandomBooking();

    const updateResponse = await bookingClient.updateBooking(
      createdBooking.bookingid,
      updatedBooking,
      authToken,
    );
    expect(updateResponse.status()).toBe(200);

    const updatedResponseData = await updateResponse.json();

    expect(updatedResponseData.firstname).toBe(updatedBooking.firstname);
    expect(updatedResponseData.lastname).toBe(updatedBooking.lastname);
    expect(updatedResponseData.totalprice).toBe(updatedBooking.totalprice);

    const getResponse = await bookingClient.getBookingById(
      createdBooking.bookingid,
    );
    expect(getResponse.status()).toBe(200);

    const retrievedBooking = await getResponse.json();
    expect(retrievedBooking.firstname).toBe(updatedBooking.firstname);
    expect(retrievedBooking.lastname).toBe(updatedBooking.lastname);
  });

  test("Delete a booking", async ({ request }) => {
    const bookingClient = new BookingClient(request);
    const booking = createRandomBooking();

    const createResponse = await bookingClient.createBooking(booking);
    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();
    const bookingId = createdBooking.bookingid;

    const deleteResponse = await bookingClient.deleteBooking(
      bookingId,
      authToken,
    );
    expect(deleteResponse.status()).toBe(201);

    const getResponse = await bookingClient.getBookingById(bookingId);
    expect(getResponse.status()).toBe(404);
  });

  test("Get authentication token", async ({ request }) => {
    const bookingClient = new BookingClient(request);
    const token = await bookingClient.getToken("admin", "password123");

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);

    const booking = createRandomBooking();
    const createResponse = await bookingClient.createBooking(booking);
    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();

    const updatedBooking = createRandomBooking();
    const updateResponse = await bookingClient.updateBooking(
      createdBooking.bookingid,
      updatedBooking,
      token,
    );
    expect(updateResponse.status()).toBe(200);
  });

  test("Get booking by ID with filters", async ({ request }) => {
    const bookingClient = new BookingClient(request);
    const booking = createRandomBooking();

    const createResponse = await bookingClient.createBooking(booking);
    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();
    const bookingId = createdBooking.bookingid;

    const getResponse = await bookingClient.getBookingById(bookingId);
    expect(getResponse.status()).toBe(200);

    const retrievedBooking = await getResponse.json();

    expect(retrievedBooking).toHaveProperty("firstname");
    expect(retrievedBooking).toHaveProperty("lastname");
    expect(retrievedBooking).toHaveProperty("bookingdates");
    expect(retrievedBooking.bookingdates).toHaveProperty("checkin");
    expect(retrievedBooking.bookingdates).toHaveProperty("checkout");
  });

  test("Negative test: Get non-existent booking", async ({ request }) => {
    const bookingClient = new BookingClient(request);
    const nonExistentId = 999999999;

    const response = await bookingClient.getBookingById(nonExistentId);
    expect(response.status()).toBe(404);
  });

  test("Negative test: Update booking with invalid token", async ({
    request,
  }) => {
    const bookingClient = new BookingClient(request);
    const booking = createRandomBooking();

    const createResponse = await bookingClient.createBooking(booking);
    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();

    const invalidToken = "invalid_token_123";

    const response = await bookingClient.updateBooking(
      createdBooking.bookingid,
      createRandomBooking(),
      invalidToken,
    );
    expect(response.status()).toBe(403);
  });
});
