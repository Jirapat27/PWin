import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    UserCircleIcon,
    FlagIcon,
    MapPinIcon,
    PowerIcon,
    ChatBubbleBottomCenterTextIcon
  } from "@heroicons/react/24/solid";


   
  export function SideBar() {
    return (
      <Card className="h-auto w-full max-w-[20rem] p-5 shadow-xl shadow-blue-gray-900/5">

        <List>
          <ListItem>
            <ListItemPrefix className="p-5">
              <PresentationChartBarIcon className="h-7 w-7" />
            </ListItemPrefix>

            <Link to={"home"}>Dashboard</Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix className="p-5">
              <MapPinIcon className="h-7 w-7" />
            </ListItemPrefix>
            <Link to={"markwin"}>MarkWins</Link>
            
          </ListItem>
          <ListItem>
            <ListItemPrefix className="p-5">
              <FlagIcon className="h-7 w-7" />
            </ListItemPrefix>
            <Link to={"reports"}>Reports</Link>
            
            <ListItemSuffix className="p-5">
              <Chip  value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full " />
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix className="p-5">
              <ChatBubbleBottomCenterTextIcon className="h-7 w-7" />
            </ListItemPrefix>
            <Link to={"comment"}>Comments</Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix className="p-5">
              <UserCircleIcon className="h-7 w-7" />
            </ListItemPrefix>
            <Link to={"user"}>Users</Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix className="p-5">
              <PowerIcon className="h-7 w-7" />
            </ListItemPrefix>
            <Link to={"logout"}>Log Out</Link>
            
          </ListItem>
        </List>
      </Card>
    );
  }