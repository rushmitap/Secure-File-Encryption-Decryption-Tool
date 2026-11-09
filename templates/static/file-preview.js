
const fileInput = document.getElementById("fileInput");
const uploadZone = document.getElementById("uploadZone");
const filePreview = document.getElementById("filePreview");
const fileName = document.getElementById("fileName");
const fileMeta = document.getElementById("fileMeta");
const fileIcon = document.getElementById("fileIcon");
const removeFile = document.getElementById("removeFile");
const submitButton = document.getElementById("submitButton");

function formatSize(bytes) {
    if (bytes < 1024) return bytes + " Bytes";
    if (bytes < 1024 * 1024)
        return (bytes / 1024).toFixed(2) + " KB";

    if (bytes < 1024 * 1024 * 1024)
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";

    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
}

function getFileIcon(name) {
    const extension = name.split(".").pop().toLowerCase();

    const icons = {
        pdf: "📕",
        doc: "📘",
        docx: "📘",
        txt: "📄",
        jpg: "🖼️",
        jpeg: "🖼️",
        png: "🖼️",
        gif: "🖼️",
        mp3: "🎵",
        wav: "🎵",
        mp4: "🎬",
        zip: "📦",
        rar: "📦",
        py: "🐍",
        js: "💻",
        html: "🌐",
        css: "🎨",
        java: "☕",
        xlsx: "📊",
        csv: "📊"
    };

    return icons[extension] || "📁";
}

function displayFile(file) {
    if (!file) return;

    fileName.textContent = file.name;
    fileMeta.textContent =
        formatSize(file.size) + " • " +
        (file.type || "Unknown file type");

    fileIcon.textContent = getFileIcon(file.name);

    filePreview.classList.add("active");
    submitButton.disabled = false;
}

fileInput.addEventListener("change", function () {
    displayFile(this.files[0]);
});

removeFile.addEventListener("click", function () {
    fileInput.value = "";
    filePreview.classList.remove("active");
    submitButton.disabled = true;
});

// Drag and drop

["dragenter", "dragover"].forEach(event => {
    uploadZone.addEventListener(event, function (e) {
        e.preventDefault();
        uploadZone.classList.add("drag-over");
    });
});

["dragleave", "drop"].forEach(event => {
    uploadZone.addEventListener(event, function (e) {
        e.preventDefault();
        uploadZone.classList.remove("drag-over");
    });
});

uploadZone.addEventListener("drop", function (e) {
    const files = e.dataTransfer.files;

    if (files.length > 0) {
        try {
            const transfer = new DataTransfer();
            transfer.items.add(files[0]);
            fileInput.files = transfer.files;
            displayFile(files[0]);
        } catch (error) {
            console.error("Could not select dropped file:", error);
        }
    }
});
