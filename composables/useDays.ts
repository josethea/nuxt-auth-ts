import type { Day } from '~/types/day'
import axios from 'axios'
import { useSessionStore } from '~/store/session';

export const useDaysComposable = () => {
  const days = ref<Day[]>([]);

  const sessionStore = useSessionStore();
  const userId = sessionStore.session?.user?.id;

  const getDays = async () => {
    const response = await axios.get('/api/day', { params: { userId } });
    days.value = response.data.data;
  }

  // const createDay = async (day: Day) => {
  //   const response = await axios.post('/api/day', day);
  //   await getDays();
  // }

  // const updateDay = async (day: Day) => {
  //   const response = await axios.put('/api/day', day);
  //   await getDays();  
  // }

  // const deleteDay = async (day: Day) => {
  //   const response = await axios.delete('/api/day', { data: day } );
  //   await getDays();
  // }

  return {
    days,
    getDays,
    // createDay,
    // updateDay,
    // deleteDay
  }
}