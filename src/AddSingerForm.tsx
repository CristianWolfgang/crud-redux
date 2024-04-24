import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Singer,
  VoiceType,
  addSinger,
  updateSinger,
} from "./features/crud/crud-slice";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { toggleUpdate } from "./features/crud/active-updating-slice";

const AddSingerForm = () => {
  const singers = useSelector((state: RootState) => state.crud),
    isUpdating = useSelector((state: RootState) => state.toggle),
    [singer, setSinger] = useState<Singer>({
      id: crypto.randomUUID(),
      voiceType: VoiceType[0],
    }),
    dispatch = useDispatch(),
    onChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
      setSinger({
        ...singer,
        [e.currentTarget.name as keyof Singer]: e.currentTarget.value,
      });
    },
    selectRef = useRef<HTMLSelectElement>(null),
    onClickHandler = () => {
      if (
        singer.name != "" &&
        singer.band != "" &&
        singer.voiceType! in VoiceType
      ) {
        if (!isUpdating.id) {
          dispatch(addSinger(singer));
        } else {
          dispatch(updateSinger(singer));
          dispatch(toggleUpdate());
        }

        setSinger({
          id: crypto.randomUUID(),

          voiceType: VoiceType[0],
        });
      }
    },
    onChangeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      setSinger({
        ...singer,
        voiceType: VoiceType[Number(e.currentTarget.value)],
      });
    },
    VoiceTypeList = () => (
      <select
        ref={selectRef}
        onChange={onChangeSelectHandler}
        value={VoiceType[singer.voiceType as keyof typeof VoiceType]}
      >
        {Object.keys(VoiceType).map((element, id) => {
          if (isNaN(Number(element))) {
            return (
              <option
                key={id}
                value={VoiceType[element as keyof typeof VoiceType]}
              >
                {element}
              </option>
            );
          }
        })}
      </select>
    );
  useEffect(() => {
    selectRef.current?.focus();
  }, [singer.voiceType]);

  useEffect(() => {
    if (isUpdating.id) {
      const { id } = isUpdating;
      setSinger(singers.filter((singer) => singer.id === id)[0]);
    }
  }, [isUpdating.id]);
  return (
    <div>
      <h3>{isUpdating.id ? "Update" : "Add"} Singer</h3>
      <input
        type="text"
        value={singer.name || ""}
        onChange={onChangeHandler}
        placeholder="Singer name"
        name="name"
      />
      <input
        type="text"
        value={singer.band || ""}
        onChange={onChangeHandler}
        placeholder="Singer band"
        name="band"
      />
      <VoiceTypeList />
      &nbsp;
      <button onClick={onClickHandler}>
        {isUpdating.id ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default AddSingerForm;
