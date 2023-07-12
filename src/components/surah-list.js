import React, { useEffect, useState } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { listSurahs } from "../graphql/queries";
import { Paper, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { updateSurah } from "../graphql/mutations";
import ReactPlayer from "react-player";
const SurahList = () => {
  const [surahs, setSurahs] = useState([]);

  const fetchsurahs = async () => {
    try {
      const surahData = await API.graphql(graphqlOperation(listSurahs));
      console.log(surahData);
      const surahList = surahData.data.listSurahs.items;
      setSurahs(surahList);
    } catch (error) {
      console.log("error on fetching surahs", error);
    }
  };

  const addLike = async (idx) => {
    try {
      const surah = surahs[idx];
      surah.likes = surah.likes + 1;
      delete surah.createdAt;
      delete surah.updatedAt;

      console.log(surah);
      const surahData = await API.graphql(
        graphqlOperation(updateSurah, { input: surah })
      );
      const surahList = [...surahs];
      surahList[idx] = surahData.data.updateSurah;
      setSurahs(surahList);
    } catch (error) {
      console.log("error on adding Like to surah", error);
    }
  };

  useEffect(() => {
    fetchsurahs();
  }, []);

  const [surahPlaying, setSurahPlaying] = useState("");
  const [audioURL, setAudioURL] = useState("");

  const toggleSurah = async (idx) => {
    if (surahPlaying === idx) {
      setSurahPlaying("");
      return;
    }

    const surahFilePath = surahs[idx].filePath;
    try {
      const fileAccessURL = await Storage.get(surahFilePath, { expires: 60 });
      console.log("access url", fileAccessURL);
      setSurahPlaying(idx);
      setAudioURL(fileAccessURL);
      return;
    } catch (error) {
      console.error("error accessing the file from s3", error);
      setAudioURL("");
      setSurahPlaying("");
    }
  };

  return (
    <div>
      <div className="surahList">
        {surahs.map((surah, idx) => {
          return (
            <Paper variant="outlined" elevation={2} key={`surah${idx}`}>
              <div className="surahCard">
                <IconButton aria-label="play" onClick={() => toggleSurah(idx)}>
                  {surahPlaying === idx ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <div>
                  <div className="surahTitle">{surah.title}</div>
                  <div className="surahOwner">{surah.owner}</div>
                </div>
                <div>
                  <IconButton onClick={() => addLike(idx)} aria-label="like">
                    <FavoriteIcon />
                  </IconButton>
                  {surah.likes}
                </div>
                <div className="surahDescription">{surah.description}</div>
              </div>
              {surahPlaying === idx ? (
                <div className="ourAudioPlayer">
                  <ReactPlayer
                    url={audioURL}
                    controls
                    playing
                    height="50px"
                    onPause={() => toggleSurah(idx)}
                  />
                </div>
              ) : null}
            </Paper>
          );
        })}
      </div>
    </div>
  );
};

export default SurahList;
