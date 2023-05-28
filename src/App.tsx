import Tasks from "./Views/Market";
const App = () => {
    return (
        <div className="flex justify-center items-center flex-col h-screen space-y-5 bg-white">
            <h1 className="text-4xl font-bold text-center ">
                Task Manager
            </h1>
            <Tasks />
        </div>
    );
}

export default App;
