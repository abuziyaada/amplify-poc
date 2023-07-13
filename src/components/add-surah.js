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

  const [isUploading, setIsUploading] = useState(false);

  const uploadSurah = async () => {
    //Upload the surah
    console.log("surahData", surahData);
    const { title, description, owner } = surahData;

    if (!title || !description || !owner || !mp3Data)
      return alert("Fill all fields");

    setIsUploading(true);

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
    setIsUploading(false);
    alert("Surah Uploaded successfully");
    onUpload();
  };

  return (
    <div className="newsurah">
      <TextField
        label="Title"
        value={surahData.title}
        onChange={(e) => setSurahData({ ...surahData, title: e.target.value })}
        disabled={isUploading}
      />
      <TextField
        label="Artist"
        value={surahData.owner}
        onChange={(e) => setSurahData({ ...surahData, owner: e.target.value })}
        disabled={isUploading}
      />
      <TextField
        label="Description"
        value={surahData.description}
        onChange={(e) =>
          setSurahData({ ...surahData, description: e.target.value })
        }
        disabled={isUploading}
      />
      <input
        type="file"
        disabled={isUploading}
        accept="audio/mp3"
        onChange={(e) => setMp3Data(e.target.files[0])}
      />

      <IconButton disabled={isUploading} onClick={uploadSurah}>
        <PublishIcon />
      </IconButton>
    </div>
  );
};

export default AddSurah;
