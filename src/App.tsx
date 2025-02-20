/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ChangeEvent, useState, useContext } from "react";
import './App.css';
import EnrolmentForm from './components/EnrolmentForm';
import { Student } from "./entities/Student";  
import EnrolList from "./components/EnrolList/EnrolList";
import { FormattedMessage, IntlProvider  } from "react-intl"; 
import { LanguageContext } from "./context/LanguageContext";



// PADRE
function App() {

  const { locale, messages, changeLanguage } = useContext(LanguageContext);
  const [program, setProgram] = useState("UG");

  // Paso de info de HIJO a PADRE
  const [ugEnrolments, setUGEnrolments] = useState(0);
  const [pgEnrolments, setPGEnrolments] = useState(0);
  
  const [student, setStudent] = useState<Student | undefined>();
  const [editingStudent, setEditingStudent] = useState<Student>();

  const handleChangeEnrolments = (updateEnrolments: number) => {
    program === "UG" ? setUGEnrolments(updateEnrolments) : setPGEnrolments(updateEnrolments);
  };

  const handleChangeProgram = (event: ChangeEvent<HTMLLIElement>) => {
    setProgram(event.target.value.toString());
  };

  const handleAddStudent = (student: Student) => {
    setStudent(student); 
  };

  const selectedEnrolments = (): number => {
    return program === "UG" ? ugEnrolments : pgEnrolments;
  }

  const handleStudentRemoved = (student: Student): void => {
    student.program === "UG" ? setUGEnrolments(ugEnrolments - 1) :
        setPGEnrolments(pgEnrolments - 1);
  }

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(event.target.value);
  };
  
  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className="App">
        {/* Selector de Idioma */}
        <div className="language-selector">
          <label htmlFor="language">
            <FormattedMessage id="app.label.language" defaultMessage="Language" />:
          </label>
          <select id="language" value={locale} onChange={handleChangeLanguage}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="programs">
          <ul className="ulEnrol">
            <li className="parentLabels" onChange={handleChangeProgram}>
              <input type="radio" value="UG" name="programGroup" defaultChecked />
              <FormattedMessage id="app.label.grado" defaultMessage="Grado" />
              <input type="radio" className="radioSel" value="PG" name="programGroup" />
              <FormattedMessage id="app.label.postgrado" defaultMessage="Postgrado" />
            </li>
            <label>
              <FormattedMessage id="app.label.matriculaciones" defaultMessage="Matriculaciones actuales" /> ({program}): {selectedEnrolments()}
            </label>
          </ul>

          <EnrolmentForm 
            chosenProgram={program} 
            onChangeEnrolments={handleChangeEnrolments} 
            currentEnrolments={selectedEnrolments()} 
            onStudentChanged={handleAddStudent}
            editingStudent={editingStudent} 
          />

          <EnrolList 
            student={student}  
            onStudentRemoved={handleStudentRemoved} 
            onStudentEditing={setEditingStudent}
          />
        </div>
      </div>
    </IntlProvider>
  );
}
export default App;
