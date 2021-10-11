export default function(idToComponentMap) {
    for(const id in idToComponentMap) {
        const el = document.getElementById(id);
        const ElComponent = idToComponentMap[id];
        if(el) {
            ReactDOM.render(
                <React.StrictMode>
                    <ElComponent />
                </React.StrictMode>,
                el
            );
        }
    }
}