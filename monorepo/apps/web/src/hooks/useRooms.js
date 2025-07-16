import { useEffect, useState } from "react";
import { fetchRooms } from "../services/roomService";

export function useRooms() {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchRooms();

      setRooms(data);
      setLoading(false);
    }

    load();
  }, []);

  return { loading, rooms };
}
