import Ffmpeg from "fluent-ffmpeg"
import FfmpegInstaller from "@ffmpeg-installer/ffmpeg"

Ffmpeg.setFfmpegPath(FfmpegInstaller.path)

Ffmpeg('videos/video.mp4', { timeout: 432000}).addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10',
    '-hls_list_size 0',
    '-f hls'
]).output('videos/output.m3u8').on('end', () => {
    console.log('end')
}).run()