import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const MediaCard = ({ img, location, name, openhour, width }) => {
	return (
		<Card
			sx={
				width
					? { width, boxShadow: "5px 5px 5px rgba(0,0,0,0.1)" }
					: { maxWidth: "345px", boxShadow: "5px 5px 5px rgba(0,0,0,0.1)" }
			}
		>
			<CardMedia
				sx={{ objectFit: "fill" }}
				component="img"
				height="200"
				image={img}
				alt="사진을 찾을 수 없습니다"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					위치 : {location}
					<br></br> 영업 시간 : {openhour}
				</Typography>
			</CardContent>
		</Card>
	);
};
