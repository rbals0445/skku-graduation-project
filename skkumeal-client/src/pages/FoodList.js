import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MediaCard } from "../components";
import { Grid, Box } from "@mui/material";
import { CATEGORY } from "../constants/constant";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { fetchStoreLists } from "../apis";

export const FoodList = () => {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const res = fetchStoreLists(category).then((res) =>
      setData((prev) => [...prev, ...res.data])
    );
  }, []);

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          fontSize: "40px",
          display: "flex",
          justifyContent: "space-between",
          margin: "16px 32px",
        }}
      >
        <div>
          {CATEGORY[category]}
          {category}
        </div>
        <div>
          <HomeIcon
            onClick={handleNavigate}
            sx={{ fontSize: "48px", cursor: "pointer" }}
          />
        </div>
      </div>
      <Box
        sx={{
          flexGrow: 1,
          padding: "32px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          height: "100vh",
        }}
      >
        <Grid container>
          {data &&
            data.map((elem, key) => {
              return (
                <Grid item sm={12} md={6} lg={4} xl={3} key={key}>
                  <MediaCard
                    img={elem.image}
                    location={elem.location}
                    name={elem.name}
                    openhour={elem.open_hour}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
};
