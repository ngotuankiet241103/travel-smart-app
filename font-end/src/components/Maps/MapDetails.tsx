import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface MapDetailsProps {
  date: string;
  onBack: () => void;
}

const MapDetails: React.FC<MapDetailsProps> = ({ date, onBack }) => {
  const day = useSelector((state: RootState) =>
    state.destinations.days.find((d) => d.date === date)
  );
  const distances = useSelector(
    (state: RootState) => state.destinations.distances[date]
  );

  let totalTravelTimeInMinutes = 0;

  if (distances && Array.isArray(day?.destinations)) {
    totalTravelTimeInMinutes = day.destinations.reduce(
      (total, destination, index) => {
        const travelTime =
          index > 0 && distances[index] ? distances[index].travelTime : 0;
        return total + Number(travelTime);
      },
      0
    );
  }

  console.log(totalTravelTimeInMinutes);
  const hours = Math.floor(totalTravelTimeInMinutes / 60);
  const minutes = totalTravelTimeInMinutes % 60;

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-3">Chi tiết chuyến đi - {date}</h3>
      <div className="space-y-2">
        {day?.destinations.map((destination, index) => {
          const distance = index > 0 ? distances?.[index]?.distance : 0;
          const travelTime = index > 0 ? distances?.[index]?.travelTime : 0;

          return (
            <div key={index} className="flex flex-col items-start">
              {index > 0 && (
                <div className="text-secondary text-sm mb-1 dark:text-white">
                  <div>
                    Số km: {Math.floor(distance)} km | Thời gian: {travelTime}{" "}
                    phút
                  </div>
                </div>
              )}
              <div className="text-lg text-primary font-semibold">
                {destination.name}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="bg-gradient-to-r from-primary mt-6 to-secondary hover:bg-gradient-to-r w-24 hover:from-secondary hover:bg-primary transition-all duration-600 text-white p-2 rounded-full"
        >
          Trở về
        </button>
        <div>
          <strong>
            Tổng thời gian di chuyển: {hours} giờ {minutes} phút
          </strong>
        </div>
      </div>
    </div>
  );
};

export default MapDetails;
