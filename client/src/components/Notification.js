import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container, Card } from "semantic-ui-react";

export default function Notification() {
  const [notifications, setNotifications] = useState([
    { isFriend: false, name: "", id: "" },
  ]);

  useEffect(() => {
    // TODO fetch notifications

    setNotifications([
      { isFriend: false, name: "discoksjd party", id: "" },
      { isFriend: false, name: "disco party2", id: "" },
      { isFriend: true, name: "friend2", id: "" },
    ]);
  }, []);

  const handleYes = (clicked) => {
    //TODO fetch add relation

    let temp = [];
    notifications.forEach((notification) => {
      if (notification !== clicked) temp.push(notification);
    });
    setNotifications(temp);
  };

  const handleNo = (clicked) => {
    //TODO fetch reject relation

    let temp = [];
    notifications.forEach((notification) => {
      if (notification !== clicked) temp.push(notification);
    });
    setNotifications(temp);
  };

  const getNotification = (notification) => {
    return (
      <div className={"card bg-light p-1 mt-2"}>
        <div className="row">
          <div className="col-6">
            <span className="h5" style={{ height: "30px", lineHeight: "30px" }}>
              {notification.isFriend ? "Friend: " : "Party: "}
            </span>
            {notification.name}
          </div>
          <div className="col-3">
            <button
              className="btn btn-success w-100"
              onClick={() => {
                handleYes(notification);
              }}
            >
              Y
            </button>
          </div>
          <div className="col-3">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                handleNo(notification);
              }}
            >
              N
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card className="text-center p-2" style={{ width: "30vw" }}>
        <h3 className="text-center h3">Invitations</h3>
        {notifications.map((notification) => getNotification(notification))}
      </Card>
    </div>
  );
}
