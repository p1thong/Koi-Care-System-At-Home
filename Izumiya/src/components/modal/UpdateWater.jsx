import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleUpdateWaterModal } from "../../redux/slices/modal/modal";
import * as PondService from "../../service/pond/pondService";
import * as WaterService from "../../service/waterParams/waterParamsService";
import "../../styles/components/modal/modal.css";

export const UpdateWater = () => {
  const { pondId } = useParams();
  const [submitData, setSubmitData] = useState({
    waterParamId: "",
    o2: "",
    temperature: "",
    nh4: "",
    salt: "",
    ph: "",
    no2: "",
    no3: "",
  });
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);

  const {
    data: pondInfo = {},
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["pond-detail", pondId],
    queryFn: () => PondService.detailPondService(pondId),
  });

  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (pondInfo?.waterParam) {
      setSubmitData({
        waterParamId: pondInfo?.waterParam?.waterParamId || 0,
        salt: pondInfo?.waterParam?.salt || "",
        temperature: pondInfo?.waterParam?.temperature || 0,
        ph: pondInfo?.waterParam?.ph || 0,
        o2: pondInfo?.waterParam?.o2 || 0,
        no3: pondInfo?.waterParam?.no3 || 0,
        no2: pondInfo?.waterParam?.no2 || 0,
        nh4: pondInfo?.waterParam?.nh4 || 0,
      });
    }
  }, [pondInfo, isFetching, isLoading]);

  const dispatch = useDispatch();
  const queryCilent = useQueryClient();

  const mutation = useMutation({
    mutationKey: [
      "update-water",
      pondInfo.waterParam && pondInfo.waterParam.waterParamId,
    ],
    mutationFn: (updateData) => {
      WaterService.updateWaterService(
        pondInfo.waterParam && pondInfo.waterParam.waterParamId,
        updateData
      );
    },
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    onSuccess: () => {
      toast.success("Update successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        location.reload();
        setIsPreventSubmit(false);
      }, 1500);
      queryCilent.invalidateQueries({
        queryKey: ["pond-detail"],
      });
    },
  });

  const handleToggleUpdateWaterModal = () => {
    dispatch(toggleUpdateWaterModal());
  };

  const handleInputFloatWater = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: parseFloat(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPreventSubmit) {
      toast.error("On going process, try again later", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (
      submitData.nh4 === "" ||
      submitData.no2 === "" ||
      submitData.no3 === "" ||
      submitData.o2 === "" ||
      submitData.ph === "" ||
      submitData.salt === "" ||
      submitData.temperature === ""
    ) {
      toast.error("Please input all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (isNaN(submitData.nh4)) {
      toast.error("NH3/NH4 must be number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (isNaN(submitData.no2)) {
      toast.error("NO2 must be number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (isNaN(submitData.no3)) {
      toast.error("NO3 must be number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (isNaN(submitData.o2)) {
      toast.error("O2 must be number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (isNaN(submitData.ph)) {
      toast.error("pH must be number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (isNaN(submitData.salt)) {
      toast.error("Salt must be number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (isNaN(submitData.temperature)) {
      toast.error("Temperature must be number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="update-water-container">
      <ToastContainer />
      <div className="update-water-modal">
        <div className="update-water-header">
          <strong>Update Water Quality</strong>
          <i className="bx bx-x" onClick={handleToggleUpdateWaterModal}></i>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          autoCorrect="off"
          className="update-water-form"
        >
          <div className="input-two-fields">
            <div className="input-field">
              <label htmlFor="no2">NO2 (ppm)</label>
              <input
                type="text"
                id="no2"
                name="no2"
                defaultValue={submitData.no2}
                placeholder="NO2 (ppm)"
                onChange={handleInputFloatWater}
              />
            </div>
            <div className="input-field">
              <label htmlFor="no3">NO3 (ppm)</label>
              <input
                type="text"
                id="no3"
                name="no3"
                defaultValue={submitData.no3}
                placeholder="NO3 (ppm)"
                onChange={handleInputFloatWater}
              />
            </div>
          </div>
          <div className="input-two-fields">
            <div className="input-field">
              <label htmlFor="nh4">NH3/NH4 (ppm)</label>
              <input
                type="text"
                id="nh4"
                name="nh4"
                defaultValue={submitData.nh4}
                placeholder="NH3/NH4 (ppm)"
                onChange={handleInputFloatWater}
              />
            </div>
            <div className="input-field">
              <label htmlFor="o2">O2 (mg/l)</label>
              <input
                type="text"
                id="o2"
                name="o2"
                defaultValue={submitData.o2}
                placeholder="O2 (mg/l)"
                onChange={handleInputFloatWater}
              />
            </div>
          </div>
          <div className="input-two-fields">
            <div className="input-field">
              <label htmlFor="salt">Salt (%)</label>
              <input
                type="text"
                id="salt"
                name="salt"
                defaultValue={submitData.salt}
                placeholder="Salt (%)"
                onChange={handleInputFloatWater}
              />
            </div>
            <div className="input-field">
              <label htmlFor="ph">pH</label>
              <input
                type="text"
                id="ph"
                name="ph"
                defaultValue={submitData.ph}
                placeholder="pH"
                onChange={handleInputFloatWater}
              />
            </div>
          </div>
          <div className="input-field-water">
            <label>Temperature (℃)</label>
            <input
              type="text"
              id="temperature"
              name="temperature"
              defaultValue={submitData.temperature}
              placeholder="Temperature (℃)"
              onChange={handleInputFloatWater}
            />
          </div>
          <div className="submit">
            <button onClick={handleToggleUpdateWaterModal}>Cancel</button>
            <button type="submit">Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
