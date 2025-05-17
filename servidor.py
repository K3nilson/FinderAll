import http.server
import socketserver
import threading
import serial

PORT = 8000
link_location = "Localização não disponível no momento"

# Função para ler dados do Arduino via Serial
def read_from_arduino():
    global link_location
    try:
        arduino = serial.Serial('/dev/ttyACM0', 9600)  # Substitua pela porta correta
        while True:
            if arduino.in_waiting > 0:
                data = arduino.readline().decode().strip()
                if data.startswith("https://maps.google.com"):
                    print(f"Link recebido: {data}")
                    link_location = data
    except Exception as e:
        print(f"Erro na leitura do Arduino: {e}")

# Classe de Servidor HTTP
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/get-location':
            self.send_response(200)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            self.wfile.write(link_location.encode())
        else:
            super().do_GET()

# Função para iniciar o servidor local
def start_server():
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"Servidor iniciado em http://localhost:{PORT}")
        httpd.serve_forever()

# Threading para rodar servidor e leitura serial simultaneamente
thread_arduino = threading.Thread(target=read_from_arduino, daemon=True)
thread_arduino.start()
start_server()
