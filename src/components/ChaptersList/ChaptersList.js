import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import Button from "../Button";

const ChaptersList = ({
  undo,
  chapters,
  addChapter,
  toggleSection,
  addSection,
  moveSection,
}) => {
  return (
    <div>
      {chapters &&
        chapters.map((chapter, cIdx) => (
          <Chapter
            key={cIdx}
            cIdx={cIdx}
            chapter={chapter}
            toggleSection={toggleSection}
            addSection={addSection}
            moveSection={moveSection}
          >
            {chapter.title}
          </Chapter>
        ))}
      <ChapterForm addChapter={addChapter} />
      <Button
        onClick={() => {
          undo();
        }}
        className="mt-4"
      >
        Undo
      </Button>
    </div>
  );
};

export default ChaptersList;

const ChapterForm = ({ addChapter }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      if (!e.target.elements.title.value) return;
      addChapter(e.target.elements.title.value);
      e.target.elements.title.value = "";
    }}
    className="mt-1"
  >
    <input
      type="text"
      name="title"
      className="border rounded border-gray-400"
      data-testid={`new-chapter-input`}
    />
    <Button className="ml-1" dataTestId={`new-chapter-submit`}>
      {" "}
      Add chapter{" "}
    </Button>
  </form>
);

const Chapter = ({ chapter, cIdx, toggleSection, addSection, moveSection }) => (
  <div>
    <label
      className="block select-none font-bold"
      data-testid={`chapter-${cIdx}-title`}
    >
      <input
        type="checkbox"
        checked={chapter.completed}
        readOnly
        data-testid={`chapter-${cIdx}-completed`}
        className="mr-1"
      />
      {chapter.title}
    </label>
    {chapter && chapter.sections && (
      <SectionsListComponent
        sections={chapter.sections}
        toggleSection={toggleSection}
        cIdx={cIdx}
        addSection={addSection}
        moveSection={moveSection}
      />
    )}
  </div>
);

class SectionsListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sections: this.props.sections };
    console.log(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }
  onSortEnd({ oldIndex, newIndex }) {
    this.props.moveSection(this.props.cIdx, oldIndex, newIndex);
  }
  render() {
    return (
      <Sections
        sections={this.props.sections}
        toggleSection={this.props.toggleSection}
        cIdx={this.props.cIdx}
        addSection={this.props.addSection}
        moveSection={this.props.moveSection}
        onSortEnd={this.onSortEnd}
      />
    );
  }
}

const SectionsList = ({ sections, toggleSection, cIdx, addSection }) => {
  return (
    <div>
      <Sections sections={sections} toggleSection={toggleSection} cIdx={cIdx} />
      <SectionForm addSection={addSection} cIdx={cIdx} />
    </div>
  );
};

const Sections = SortableContainer(
  ({ sections, toggleSection, cIdx, addSection }) => {
    return (
      <div>
        {sections.map((section, index) => (
          <Section
            key={`index-${section.title}`}
            cIdx={cIdx}
            sIndex={index}
            index={index}
            completed={section.completed}
            toggleSection={toggleSection}
          >
            {section.title}
          </Section>
        ))}
      </div>
    );
  }
);

const SectionForm = ({ addSection, cIdx }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      if (!e.target.elements.title.value) return;
      addSection(e.target.elements.title.value, cIdx);
      e.target.elements.title.value = "";
    }}
  >
    <input
      type="text"
      name="title"
      className="border rounded border-gray-400"
      data-testid={`chapter-${cIdx}-new-section-input`}
    />
    <Button className="ml-1" dataTestId={`chapter-${cIdx}-new-section-submit`}>
      {" "}
      Add section{" "}
    </Button>
  </form>
);

const Section = SortableElement(
  ({ children, cIdx, sIndex, completed, toggleSection }) => (
    <div>
      <label
        className="block select-none ml-2"
        data-testid={`section-${cIdx}.${sIndex}-title`}
      >
        <input
          onChange={() => toggleSection(cIdx, sIndex)}
          type="checkbox"
          data-testid={`section-${cIdx}.${sIndex}-completed`}
          checked={completed}
          className="mr-1"
        />
        {children}
      </label>
    </div>
  )
);
