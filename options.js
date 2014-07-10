function save_options() {
  var mEnabled = document.getElementById('enabled').checked;
  var mDownloadMasterURL = document.getElementById('downloadMasterURL').value;
  var mReplaceImages = document.getElementById('replaceImages').checked;
  var mHandleTorrents = document.getElementById('handleTorrents').checked;
  var mHandleMagnets = document.getElementById('handleMagnets').checked;
  var mHandleDiskImages = document.getElementById('handleDiskImages').checked;
  var mHandleArchives = document.getElementById('handleArchives').checked;
  var mHandleImages = document.getElementById('handleImages').checked;
  var mHandleVideos = document.getElementById('handleVideos').checked;
  var mHandleOther = document.getElementById('handleOther').checked;
  var mHandleCustom = document.getElementById('handleCustom').checked;
  var mCustomFiles = document.getElementById('customFiles').value;
  chrome.storage.sync.set({
    enabled: mEnabled,
    downloadMasterURL: mDownloadMasterURL,
    replaceImages: mReplaceImages,
    handleTorrents: mHandleTorrents,
    handleMagnets: mHandleMagnets,
    handleDiskImages: mHandleDiskImages,
    handleArchives: mHandleArchives,
    handleImages: mHandleImages,
    handleVideos: mHandleVideos,
    handleOther: mHandleOther,
    handleCustom: mHandleCustom,
    customFiles: mCustomFiles
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    enabled: true,
    downloadMasterURL: "http://192.168.1.1:8081/downloadmaster/dm_apply.cgi?action_mode=DM_ADD&download_type=5&again=no&usb_dm_url=",
    replaceImages: false,
    handleTorrents: true,
    handleMagnets: true,
    handleDiskImages: false,
    handleArchives: false,
    handleImages: false,
    handleVideos: false,
    handleOther: false,
    handleCustom: false,
    customFiles: ""
  }, function(items) {
    document.getElementById('enabled').checked = items.enabled;
    document.getElementById('downloadMasterURL').value = items.downloadMasterURL;
    document.getElementById('replaceImages').checked = items.replaceImages;
    document.getElementById('handleTorrents').checked = items.handleTorrents;
    document.getElementById('handleMagnets').checked = items.handleMagnets;
    document.getElementById('handleDiskImages').checked = items.handleDiskImages;
    document.getElementById('handleArchives').checked = items.handleArchives;
    document.getElementById('handleImages').checked = items.handleImages;
    document.getElementById('handleVideos').checked = items.handleVideos;
    document.getElementById('handleOther').checked = items.handleOther;
    document.getElementById('handleCustom').checked = items.handleCustom;
    document.getElementById('customFiles').value = items.customFiles;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);