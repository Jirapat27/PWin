import React from "react";
import { Link } from "react-router-dom";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UsersIcon,
  FlagIcon,
  MapPinIcon,
  PowerIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";

export function SideBar() {
  return (
      <Card className="h-100 w-full max-w-[20rem] p-5 shadow-xl shadow-blue-gray-900/5">

        <List >
          <Link to={"home"}>
            <ListItem>
              <ListItemPrefix className="p-5">
                <PresentationChartBarIcon className="h-7 w-7" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>

          <Link to={"markwin"}>
            <ListItem>
              <ListItemPrefix className="p-5">
                <MapPinIcon className="h-7 w-7" />
              </ListItemPrefix>
              MarkWins
            </ListItem>
          </Link>

          <Link to={"reports"}>
            <ListItem>
              <ListItemPrefix className="p-5">
                <FlagIcon className="h-7 w-7" />
              </ListItemPrefix>
              Reports
            </ListItem>
          </Link>

          <Link to={"comment"}>
            <ListItem>
              <ListItemPrefix className="p-5">
                <ChatBubbleBottomCenterTextIcon className="h-7 w-7" />
              </ListItemPrefix>
              Comments
            </ListItem>
          </Link>

          <Link to={"user"}>
            <ListItem>
              <ListItemPrefix className="p-5">
                <UsersIcon className="h-7 w-7" />
              </ListItemPrefix>
              Users
            </ListItem>
          </Link>

          <Link to={"/"}>
            <ListItem>
              <ListItemPrefix className="p-5">
                <PowerIcon className="h-7 w-7" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </Link>
        </List>
      </Card>
  );
}
