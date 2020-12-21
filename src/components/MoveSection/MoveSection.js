import React, { useState } from "react";
import ReactDOM from "react-dom";

import Button from "../Button";

const MoveSection = ({
  chapters,
  oldChapterIndex,
  sectionIdx,
  moveSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const moveOnClick = (id) => {
    moveSection(oldChapterIndex, id, sectionIdx);
    toggle();
  };
  return (
    <>
      <Button className="standard-btn ml-1" onClick={() => toggle()}>
        Переместить
      </Button>
      {isOpen &&
        ReactDOM.createPortal(
          <div className="bg-gray-700 appearance-none top-0 bottom-0 left-0 right-0 flex justify-center">
            <div className="flex-col">
              <h4>Выберите главу</h4>
              {chapters.map((chapter, id) => (
                <div className="mt-1" key={id}>
                  <Button onClick={() => moveOnClick(id)} data-h={id}>
                    {chapter.title}
                  </Button>
                </div>
              ))}
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
    </>
  );
};

export default MoveSection;
