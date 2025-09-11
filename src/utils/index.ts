import { Manrope } from "next/font/google";
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const createOrderCode = () => `DH-${new Date().getTime().toString().slice(-6)}`;
export { manrope };

export const formatViewstoK = (views: number) => {
  if (views < 1000) return views.toString();
  return `${(views / 1000).toFixed(1)}K`;
};

export const formatMinutesToHours = (minutes: number) => {
  if (minutes < 60) return `${minutes}p`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}p`;
}