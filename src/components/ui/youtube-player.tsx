// ts
import React from "react"
import YouTube, { YouTubeProps } from "react-youtube"

interface YouTubePlayerProps {
  productVideoId: string
  width?: number
  height?: number
}

export default function YoutubePlayer({
  productVideoId,
  width,
}: YouTubePlayerProps) {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  const opts: YouTubeProps["opts"] = {
    width: 1080,
    height: 520,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  }

  return (
    <div className="h-full w-full">
      <YouTube videoId={productVideoId} opts={opts} onReady={onPlayerReady} />
    </div>
  )
}
