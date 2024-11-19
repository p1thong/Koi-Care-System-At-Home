import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../../styles/dashboard/myorderdetail/myorderdetail.css";

// import slices
import {
  toggleCreateRefundModal,
  toggleRejectOrderModal,
} from "../../../redux/slices/modal/modal";
import { setOrderInfo } from "../../../redux/slices/order/order";
// import redux
import { useDispatch } from "react-redux";
// import service
import * as OrderService from "../../../service/order/order";

import ClipLoader from "react-spinners/ClipLoader";
export const MyOrderDetail = () => {
  const orderStatus = {
    pending: "pending",
    approved: "approved",
    rejected: "rejected",
    refunded: "refunded",
  };
  // param
  const { orderId } = useParams();
  // dispatch
  const dispatch = useDispatch();
  // state
  const [orderListProduct, setOrderListProduct] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [serverError, setServerError] = useState(null);
  // query
  const {
    data: orderInfo = {},
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: () => OrderService.getOrderById(orderId),
  });
  // handle func
  const handleToggleCancelMyOrderModal = (orderInfo) => {
    dispatch(setOrderInfo(orderInfo));
    dispatch(toggleRejectOrderModal());
  };
  const handleToggleCreateRefundModal = () => {
    dispatch(toggleCreateRefundModal());
  };
  useEffect(() => {
    if (isLoading || isFetching) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
    if (orderInfo && orderInfo.code === "ORDER_NOT_FOUND") {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    if (orderInfo && orderInfo.orderDetails) {
      setOrderListProduct(orderInfo.orderDetails);
    } else {
      setOrderListProduct([]);
    }
  }, [orderInfo, isFetching, isError, isLoading]);

  // handle func
  const handleSetClassNameStatus = (status) => {
    if (status === "PENDING") {
      return orderStatus.pending;
    }
    if (status === "APPROVED") {
      return orderStatus.approved;
    }
    if (status === "REJECTED") {
      return orderStatus.rejected;
    }
    if (status === "REFUNDED") {
      return orderStatus.refunded;
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  return (
    <div className="my-order-detail-container">
      {serverError ? (
        <>
          <div className="error-page">
            <p>{serverError}</p>
          </div>
        </>
      ) : isLoadingPage ? (
        <>
          <div className="loading">
            <ClipLoader color="#000000" size={40} />
          </div>
        </>
      ) : isNotFound ? (
        <>
          <div className="not-found">
            <h2>Order is not found</h2>
            <p>Please check ID of order or it had been delete !</p>
          </div>
        </>
      ) : (
        <>
          <div className="my-order-detail-header">
            <h2>My Order</h2>
            <p className={handleSetClassNameStatus(orderInfo.status)}>
              {orderInfo.status}
            </p>
          </div>
          <div className="my-order-main">
            <table className="cart">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total price</th>
                </tr>
              </thead>
              <tbody>
                {orderListProduct.map((product, index) => (
                  <tr key={product.productId}>
                    <td>{index + 1}</td>
                    <td>{product.productName}</td>
                    <td>{product.quantity}</td>
                    <td>{formatPrice(product.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="info">
              <div className="header">
                <strong>Order Information</strong>
                <p>View all my infomation when ordering</p>
              </div>
              <div className="main">
                <div className="info-item">
                  <strong>Date</strong>
                  <p>
                    {new Date(
                      orderInfo && orderInfo.createDate
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="info-item">
                  <strong>Name</strong>
                  <p>{orderInfo.fullname}</p>
                </div>
                <div className="info-item">
                  <strong>Email</strong>
                  <p>{orderInfo.email}</p>
                </div>
                <div className="info-item">
                  <strong>Phone</strong>
                  <p>{orderInfo.phone}</p>
                </div>
                <div className="info-item">
                  <strong>Payment ID</strong>
                  <p>{orderInfo.paymentId}</p>
                </div>
                <div className="info-item">
                  <strong>Payment method</strong>
                  <p>Paypal</p>
                </div>
                <div className="info-item">
                  <strong>Invoice amount</strong>
                  <p>{formatPrice(orderInfo.total)}</p>
                </div>
              </div>
            </div>
            {orderInfo?.status === "REFUNDED" ? (
              <></>
            ) : (
              <>
                {orderInfo?.status === "REJECTED" ? (
                  <>
                    <div className="reject-list">
                      <strong className="reject-text">
                        Sorry, your order has been rejected due to some reasons:
                      </strong>
                      <p className="reject-text-item">
                        1. The item is out of stock.
                      </p>
                      <p className="reject-text-item">
                        2. The shipping address provided is incomplete or
                        invalid.
                      </p>
                      <p className="reject-text-item">
                        3. There was a discrepancy in billing details.
                      </p>
                      <p className="reject-text-item">
                        4. Products are error for shipping.
                      </p>
                      <strong className="reject-text-sorry">
                        Izumiya apologizes for the inconvenience. We have
                        refunded your money. We apologize again.
                      </strong>
                    </div>
                  </>
                ) : (
                  <>
                    {orderInfo?.status === "APPROVED" ? (
                      <>
                        <div className="note">
                          <strong className="refund-text">
                            If you had requested a refund, here is some
                            infomation:
                          </strong>
                          <p className="refund-text-item">
                            1. We will handle your refund request within 2-3
                            days
                          </p>
                          <p className="refund-text-item">
                            2. If your request is approved, we will refund to
                            your paypal account within 1 day.
                          </p>
                          <p className="refund-text-item">
                            3. But if your request is rejected, your order
                            status still 'APPROVED', we will send to your email
                            the reason of rejection.
                          </p>
                          <strong className="contact">
                            If you have any questions, please contact email:
                            izumiyakoi686@gmail.com. We will resolve it as soon
                            as possible
                          </strong>
                        </div>
                        <button
                          className="request"
                          onClick={handleToggleCreateRefundModal}
                        >
                          Request refund this order
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="cancel"
                          onClick={() =>
                            handleToggleCancelMyOrderModal(orderInfo)
                          }
                        >
                          Cancel this order
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
