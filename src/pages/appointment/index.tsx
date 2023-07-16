import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { mapFetcher } from "src/api/map/fetcher";
import BottomSheet from "src/components/bottomSheet";
import Loading from "src/components/loading";
import imageUrl from "src/data/image_url";
import { IUserMapResponse } from "src/interfaces/map";
import { emergencyNightData } from "./data";
import HospitalCard from "./hospitalCard";
import HospitalDetail from "./hospitalDetail";
import * as Styled from "./index.style";
import Map from "./map";
import Search from "./search";
import { EmergencyNightTag } from "./tags";

interface ISelectedFilter {
  emergencyNight: boolean;
  nightService: boolean;
}

const Appointment = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [searchPosition, setSearchPosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [isSettingPosition, setIsSettingPosition] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<ISelectedFilter>({ emergencyNight: false, nightService: false });
  const [selectedHospital, setSelectedHospital] = useState<string>("");

  const { data, isFetching, isSuccess, refetch } = useQuery<IUserMapResponse, AxiosError>({
    queryKey: ["appointment", "map", searchPosition],
    queryFn: () => mapFetcher.getUserMap(searchPosition.lng, searchPosition.lat),
    staleTime: Infinity,
    enabled: isSettingPosition,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setSearchPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setIsSettingPosition(true);
    });
  }, []);

  const handleMoveMap = () => {
    console.log("move");
  };

  const handleClickHospitalCard = (id: string) => {
    setSelectedHospital(id);
  };

  const isReadyMap = isSettingPosition && !isFetching && isSuccess && data;

  return (
    <>
      {isSettingPosition ? (
        <Styled.Container>
          <Search />

          {isReadyMap && (
            <Map
              currentPosition={currentPosition}
              doctorPositions={data.hospitals}
              isDetail={selectedHospital ? true : false}
              setSearchPosition={setSearchPosition}
            />
          )}
          {selectedHospital ? (
            <HospitalDetail />
          ) : (
            <BottomSheet background="transparent" onClickOverlay={handleMoveMap} height="374px" isBottomSheetOpen>
              <Styled.FilterContainer>
                {emergencyNightData.map((text, idx) => (
                  <EmergencyNightTag
                    key={idx}
                    isSelected={selectedFilter[text.key]}
                    onClick={() => setSelectedFilter({ ...selectedFilter, [text.key]: !selectedFilter[text.key] })}
                  >
                    {text.label}
                  </EmergencyNightTag>
                ))}
              </Styled.FilterContainer>
              <Styled.CardContainer>
                {isReadyMap &&
                  data.hospitals
                    .filter(
                      (hospital) =>
                        (selectedFilter.emergencyNight ? hospital.emergencyNight === "Y" : true) &&
                        (selectedFilter.nightService ? hospital.nightService === "Y" : true)
                    )
                    .map((doctor, idx) => (
                      <HospitalCard
                        key={idx}
                        title={doctor.name}
                        category={doctor.type}
                        status={doctor.operatingStatus}
                        distance={doctor.meToHospitalDistance}
                        address={doctor.address}
                        operatingTime={
                          doctor.operatingTime.start || doctor.operatingTime.end
                            ? `${doctor.operatingTime.start} ~ ${doctor.operatingTime.end}`
                            : ""
                        }
                        lunchTime={
                          doctor.lunchTime.start || doctor.lunchTime.end ? `${doctor.lunchTime.start} ~ ${doctor.lunchTime.end}` : ""
                        }
                        phoneNumber={doctor.phoneNumber}
                        onClick={() => handleClickHospitalCard(doctor.id)}
                      />
                    ))}
              </Styled.CardContainer>
            </BottomSheet>
          )}
        </Styled.Container>
      ) : (
        <Loading
          title={<Styled.LoadingTitle>지도 로딩중</Styled.LoadingTitle>}
          icon={<img loading="eager" alt="icon" style={{ width: "26rem", height: "24.8rem" }} src={imageUrl.map_loading} />}
        />
      )}
    </>
  );
};

export default Appointment;
