import Button from "./Button";

export default function NewGame({reset}) {
    return (
        <div className="flex justify-center items-center">
            <Button title="New Game" btnClass="btn-primary font-pacifio font-bold text-xl text-white" onClick={reset}/>
        </div>
    )
}