exports.errorController= (req, res, next) => {
	res.status(404).render("not-found", { docTitle: "page not found" });
}