import express, { Request, Response, Router } from "express";
import createMetascraper from "metascraper";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperTitle from "metascraper-title";
import axios from "axios";
import svg_generator from "../cards/svg_generator";

const router: Router = express.Router();

const tagsRule: any = {
	tags: [
		({ htmlDom: $, url }: any) =>
			$(".categories > .category")
				.map(function () {
          // @ts-ignore
					return $(this).text();
				})
				.toArray(),
	],
};

const metascraper = createMetascraper([
	metascraperDescription(),
	metascraperImage(),
	metascraperTitle(),
  (() => tagsRule) as any
]);

router.get("/", async (req: Request, res: Response) => {
	const url =
		"https://blog.dongholab.com/2023-swuniv-hackathon-mentor-retrospection/";
	const { title, description, image } = await axios
		.get(url, { params: {} })
		.then((res) => {
			const html = res.data;
			console.log("html", html);
			return { html, url };
		})
		.then(metascraper)

	return res.status(200).send(
		svg_generator({
			title,
			description,
			tags: ["테스트1", "테스트2"],
			username: "teddy",
		})
	);
});

export default router;
