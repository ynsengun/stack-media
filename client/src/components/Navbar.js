import React, { useState, useEffect } from "react";
import { Menu, Container, Segment, Card } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Notification from "./Notification";

import {
  cleanAuth,
  isAuthenticated,
  isUser,
  isAdmin,
  getAuthName,
  isExpired,
} from "../util/AuthenticationUtil";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("home");
  const [auth, setAuth] = useState(isAuthenticated());
  const [isNotification, setNotification] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const unListen = history.listen(() => {
      // aranges the navbar active when url is changed
      let active = history.location.pathname.substring(1).replace("-", " ");
      if (active == "") {
        active = "home";
      }
      setActiveItem(active);

      window.scrollTo(0, 0);
      setAuth(isAuthenticated());
    });

    setInterval(() => {
      if (isExpired()) {
        history.push("/login");
      }
    }, 1000);

    return () => {
      unListen();
    };
  }, []);

  const handleItemClick = (e, { name }) => {
    if (name === "home") {
      history.push("/movies");
    } else {
      history.push(`/${name.replace(" ", "-")}`);
    }
  };

  const handleNotification = () => {
    setNotification(!isNotification);
  };

  const handleLogout = () => {
    
    cleanAuth();
    toast.success("Logout is successful... Redirecting to login page...");
    setTimeout(() => {
        history.push("/login");
      }, 1000);

    /*fetch("http://localhost:8080/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          cleanAuth();
          toast.success("Logout is successful... Redirecting to home page...");
          setTimeout(() => {
            history.push("/movies");
          }, 1500);
          return r;
        } else {
          return Promise.reject(new Error("An error occured"));
        }
      })
      .catch(() => {
        toast.error("Logout is failed");
      });*/
  };

  return (
    <div className="fixed-top">
      <React.Fragment>
        <Segment inverted>
          <Menu inverted secondary size="large">
            <Container>
              <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={handleItemClick}
              >
                Stack Media
              </Menu.Item>
              <Menu.Menu position="right">
                {isAuthenticated() && isAdmin() && (
                  <React.Fragment>
                    <Menu.Item
                      name="search"
                      active={activeItem === "search"}
                      onClick={handleItemClick}
                    />
                    <Menu.Item
                      name="upload"
                      active={activeItem === "upload"}
                      onClick={handleItemClick}
                    />
                    <Menu.Item name="logout" onClick={handleLogout} />
                    <Menu.Item>{`Welcome ${getAuthName()}`}</Menu.Item>
                  </React.Fragment>
                )}
                {isAuthenticated() && isUser() && (
                  <React.Fragment>
                    <Menu.Item
                      name="search"
                      active={activeItem === "search"}
                      onClick={handleItemClick}
                    />
                    <Menu.Item
                      name="notifications"
                      active={activeItem === "notifications"}
                      onClick={handleNotification}
                    />
                    <Menu.Item
                      name="settings"
                      active={activeItem === "settings"}
                      onClick={handleItemClick}
                    />
                    <Menu.Item name="logout" onClick={handleLogout} />
                    <Menu.Item>{`Welcome ${getAuthName()}`}</Menu.Item>
                  </React.Fragment>
                )}
              </Menu.Menu>
            </Container>
          </Menu>
        </Segment>
        {isNotification && <Notification />}
      </React.Fragment>
    </div>
  );
}
