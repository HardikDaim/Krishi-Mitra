import React, { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import moment from "moment";

export default function BlogCard(props) {
  const { _id } = props; // Extract _id from props

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // Send a DELETE request to the backend API using the _id prop
    axios
      .delete(`https://localhost:4000/api/delete-blog/${_id}`)
      .then((response) => {
        if (response.status === 200) {
          // Blog deleted successfully
          // You can perform additional actions here if needed
          console.log("Blog deleted successfully");
          alert("Blog deleted successfully");
        } else {
          // Handle errors here
          console.error("Error deleting blog");
        }
      })
      .catch((error) => {
        console.error("Error deleting blog:");
      });
  };

  const handleReportError = () => {
    // Implement the report an error functionality here
    handleClose();
  };

  const customButtonStyle = {
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    color: "#3f51b5", // Text color
    borderColor: "#3f51b5", // Border color set to indigo-700
  };

  return (
    <div className="row">
      <div
        className="col-6 col-lg-3 col-md-4 col-sm-4 container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Card
          sx={{
            width: {
              xs: "100%", // 100% width for extra small screens
              lg: "60%", // 75% width for large screens and above
            },
            my: 2,
            boxShadow: "5px 5px 10px #ccc",
            ":hover": { boxShadow: "10px 10px 20px #ccc" },
          }}
        >
          <CardActions>
            <Typography variant="body2" color="text.secondary">
              <span
                style={{
                  fontSize: "12px",
                }}
              >
                By:{" "}
                <span className="font-bold text-indigo-700">
                  {props.author}
                </span>
              </span>
            </Typography>
            <span
              className="ml-3"
              style={{
                fontSize: "12px", // Smaller font size for small screens
              }}
            >
              {moment(props.date).format("lll")}
            </span>
            {/* 3-dot dropdown */}
            <IconButton
              aria-label="options"
              aria-controls="options-menu"
              aria-haspopup="true"
              onClick={handleClick}
              style={{ marginLeft: "auto" }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="options-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
              <MenuItem onClick={handleReportError}>Report an Error</MenuItem>
            </Menu>
          </CardActions>
          <hr />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.content}
            </Typography>
          </CardContent>
          <CardMedia component="img" height="auto" image={props.image} />
          <CardActions>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button variant="outlined" sx={customButtonStyle}>
                Expert's Guide
              </Button>
              <Button variant="outlined" sx={customButtonStyle}>
                Comment
              </Button>
              <Button variant="outlined" sx={customButtonStyle}>
                Share
              </Button>
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
