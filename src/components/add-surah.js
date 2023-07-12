import React, { useState, useEffect } from "react";
import { TextField, IconButton } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { v4 as uuid } from "uuid";
import { createSurah } from "../graphql/mutations";
import { API, graphqlOperation, Storage } from "aws-amplify";

const AddSurah = ({ onUpload }) => {
  const [surahData, setSurahData] = useState({
    title: "",
    owner: "",
    description: "",
  });

  const [mp3Data, setMp3Data] = useState();

  const uploadSurah = async () => {
    //Upload the surah
    console.log("surahData", surahData);
    const { title, description, owner } = surahData;

    const { key } = await Storage.put(`${uuid()}.mp3`, mp3Data, {
      contentType: "audio/mp3",
    });

    const createSurahInput = {
      id: uuid(),
      title,
      description,
      owner,
      filePath: key,
      likes: 0,
    };
    await API.graphql(
      graphqlOperation(createSurah, { input: createSurahInput })
    );
    onUpload();
  };

  return (
    <div className="newsurah">
      <TextField
        label="Title"
        value={surahData.title}
        onChange={(e) => setSurahData({ ...surahData, title: e.target.value })}
      />
      <TextField
        label="Artist"
        value={surahData.owner}
        onChange={(e) => setSurahData({ ...surahData, owner: e.target.value })}
      />
      <TextField
        label="Description"
        value={surahData.description}
        onChange={(e) =>
          setSurahData({ ...surahData, description: e.target.value })
        }
      />
      <input
        type="file"
        accept="audio/mp3"
        onChange={(e) => setMp3Data(e.target.files[0])}
      />

      <IconButton onClick={uploadSurah}>
        <PublishIcon />
      </IconButton>
    </div>
  );
};

export default AddSurah;
