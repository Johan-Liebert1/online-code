export default `
<html>
    <head>
        <style>
            body {
                color: rgb(200, 200, 200);
            }

            .error {
                background-color: #2C0502;
                color: #C54854;
            }
        </style> 
    </head>
    <body>
        <div id="root"></div>
        <script>
            window.addEventListener(
                "message",
                event => {
                    // event is coming from the parent object and the event has
                    // some data property
                    // event.data has the code we're trying to execute
                    // console.log(event.data)
                    try {
                        eval(event.data);
                    } catch(err) {
                        let r = document.getElementById('root');
                        r.classList.add('error');
                        r.innerText = err;
                        console.error(err);
                    }
                },
                false
            );
        </script>
    </body>
</html>
`;
