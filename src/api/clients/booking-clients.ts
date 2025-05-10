import { APIRequestContext, APIResponse } from "@playwright/test";

export class BookingClient {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getBookings(): Promise<APIResponse> {
        return await this.request.get("/booking");
    }

    async getBookingById(id: number): Promise<APIResponse> {
        return await this.request.get(`/booking/${id}`);
    }

    async createBooking(bookingData: any): Promise<APIResponse> {
        return await this.request.post("/booking", {
            data: bookingData
        });
    }

    async updateBooking(id: number, bookingData: any, token: string): Promise<APIResponse> {
        return await this.request.put(`/booking/${id}`, {
            data: bookingData,
            headers: {
                'Cookie': `token=${token}`
            }
        });
    }

    async deleteBooking(id: number, token: string): Promise<APIResponse> {
        return await this.request.delete(`/booking/${id}`, {
            headers: {
                'Cookie': `token=${token}`
            }
        });
    }

    async getToken(username: string, password: string): Promise<string> {
        const response = await this.request.post("/auth", {
            data: {
                username,
                password
            }
        });
        const result = await response.json();
        return result.token;
    }
}