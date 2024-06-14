import axios from "axios";
import Section from "../models/Section";
import GridItem from "../models/GridItem";

class GridService {
  http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  async getAllK(): Promise<Section[]> {
    const response = await this.http.get<string[]>("grids");
    return response.data.map((item: string) => JSON.parse(item));
  }

  async getById(id: number): Promise<Section> {
    const response = await this.http.get<string>(`grids/${id}`);
    return JSON.parse(response.data);
  }

  async create(data: GridItem[]) {
    const response = await this.http.post<string>("grids", {
      GridConfig: JSON.stringify(data),
    });
    return JSON.parse(response.data);
  }

  async delete(id: string): Promise<void> {
    await this.http.delete(`grids/${id}`);
  }
}

export default new GridService();
