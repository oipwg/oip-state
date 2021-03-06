const downloadFile = function(file){
	// Check if we are in the browser
	if (typeof window !== 'undefined' && file){
		// Create the URL
		let domain_to_use = "https://ipfs.oip.io/ipfs/"

		// If we are on oip.io, custom redirect :)
		if (window.location && window.location.origin && window.location.origin === "https://oip.io"){
			// Set to the current domain
			domain_to_use = "https://ipfs.oip.io/ipfs-dl/"
		}
		let download_file_url = domain_to_use + file.parent.getLocation() + "/" + file.getFilename()

		// Create an a tag
		let download_tag = window.document.createElement('a');
		download_tag.style.display = "none";
		download_tag.id = "download_file_id_ref"
		download_tag.download = file.getFilename()
		download_tag.target = "_blank"
		download_tag.href = download_file_url

		// Add the a tag to the page
		window.document.body.appendChild(download_tag)

		// Get the a tag element reference
		let dl_a_tag = window.document.getElementById("download_file_id_ref")
		// Click to download the file, this opens it in a new tab if the file is not on the same domain
		dl_a_tag.click()
		// Remove the download button
		dl_a_tag.parentNode.removeChild(dl_a_tag)
	}
}

module.exports = {
	downloadFile
}