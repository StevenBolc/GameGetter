function toSlug(string) {
    return string.replaceAll(/[^a-zA-Z0-9 ]/g, "").replaceAll(" ", "-").toLowerCase();
}

module.exports = toSlug;
