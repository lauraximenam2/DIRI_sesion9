/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useEffect, useRef, useState, useContext } from 'react';
import { Student } from "../entities/Student";  
import './EnrolmentForm.css';
import { FormattedMessage } from "react-intl"; 
import { LanguageContext } from "../context/LanguageContext";

interface EnrolmentFormProps {
  chosenProgram: string;
  currentEnrolments: number;
  editingStudent?: Student;
  onChangeEnrolments: (updateEnrolments: number) => void; // Evento para cambiar el estado de matriculaciones
  onStudentChanged: (student: Student) => void;
}

// HIJO
function EnrolmentForm(props: EnrolmentFormProps) {
  const { locale, messages } = useContext(LanguageContext); //Usamos el contexto

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [btnTitle, setBtnTitle] = useState("app.label.register");
  const [editingStudentID, setEditingStudentID] = useState<string>();

  useEffect(() => {
    if (props.editingStudent) {
      setEditingStudentID(props.editingStudent.id);
      setFirstName(props.editingStudent.firstName);
      setLastName(props.editingStudent.lastName);
      setBtnTitle("app.label.update"); // Cambia a "Actualizar" si se está editando un estudiante
    }
  }, [props.editingStudent]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitar recarga de página

    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLInputElement;
    if (!submitter || submitter.value !== "Cancelar") {
      setWelcomeMessage(
        messages["app.welcomeMessage"]
          .replace("{firstName}", firstName)
          .replace("{lastName}", lastName)
      );
      props.onChangeEnrolments(props.currentEnrolments + 1);

      const student: Student = {
        id: editingStudentID,
        firstName: firstName,
        lastName: lastName,
        program: props.chosenProgram,
      };

      props.onStudentChanged(student);
    }

    // Reseteamos formulario
    setEditingStudentID(undefined);
    setFirstName("");
    setLastName("");
    nameInputRef.current?.focus();
    setBtnTitle("app.label.register"); // Vuelve a "Registrar"
  };

  return (
    <div>
      <form className="enrolForm" onSubmit={handleSubmit}>
        <h2>
          <FormattedMessage id="app.label.data" defaultMessage="Student Data" /> - {props.chosenProgram}
        </h2>

        <label>
          <FormattedMessage id="app.label.name" defaultMessage="Name" />
        </label>
        <input type="text" name="fname" onChange={(event) => setFirstName(event.target.value)} ref={nameInputRef} value={firstName} />

        <label>
          <FormattedMessage id="app.label.lastName" defaultMessage="Last Name" />
        </label>
        <input type="text" name="lname" onChange={(event) => setLastName(event.target.value)} value={lastName} />

        {/* Botón de Registrar / Actualizar con traducción */}
        <input type="submit" value={locale === "es" ? "Registrar" : "Submit"} className="submitButton" />

        {/* Botón de Cancelar si se está editando */}
        {props.editingStudent && (
          <input type="submit" value={locale === "es" ? "Cancelar" : "Cancel"} className="cancelButton" />
        )}

        <label id="studentMsg" className="message">
         {welcomeMessage}
        </label>
      </form>
    </div>
  );
}

export default EnrolmentForm;
