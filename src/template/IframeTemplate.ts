import { Runtime } from "../types";

const template = (error: string, runtime: Runtime = "javascript") => {
    const body =
        error.length > 0
            ? `<body class="error">${error}</body>`
            : `<body>
        <div id='root'></div>
        <script defer>
            const originalConsoleLog = console.log;

            if (window.console && console.log) {
                console.log = function (...args) {
                    const h5 = document.createElement("h5");

                    h5.innerText = args.join(" ");

                    document.body.appendChild(h5);
                }
            }

            const handleError = (err) => {
                originalConsoleLog('called handle error')
                let r = document.body;
                r.classList.add('error');
                r.innerHTML = '<h1> Runtime Error </h1> <h3>' + err + '<h3>';
                console.error(err);
            }

            window.addEventListener('error', (e) => {
                e.preventDefault();
                originalConsoleLog('error', e);
                handleError(e.error);
            })

            window.addEventListener(
                "message",
                event => {
                    // event is coming from the parent object and the event has
                    // some data property
                    // event.data has the code we're trying to execute
                    // originalConsoleLog({event}, '${runtime}')

                    if ('${runtime}' === 'javascript') {
                        try {
                            eval(event.data.code);
                        } catch(err) {
                            handleError(err);
                        }
                    } else {
                        if (event.data.stderr?.length > 0) {
                            handleError({ error: event.data.stderr });
                        } else {
                            console.log(event.data.stdout);
                        }
                    }
                },
                false
            );
        </script>
    </body>`;

    return `
        <html>
            <head>
                <style>
                    body {
                        color: rgb(200, 200, 200);
                        background-color: rgb(14,16,26);
                        font-family: Ubuntu Mono;
                    }

                    .error {
                        background-color: #2C0502;
                        color: #C54854;
                    }
                </style> 
            </head>
            ${body}
        </html>
    `;
};

export default template;
