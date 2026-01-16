from flask import Flask, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)  # allow all origins

def get_systemd_services():
    # List all services
    all_services = subprocess.run(
        ['systemctl', 'list-units', '--type=service', '--all', '--no-legend'],
        capture_output=True,
        text=True
    ).stdout.strip().splitlines()

    service_names = [line.split()[0] for line in all_services]

    services = []
    for svc in service_names:
        # Get systemctl info
        result = subprocess.run(
            ['systemctl', 'show', svc, '--no-page'],
            capture_output=True,
            text=True
        )
        info = {}
        for line in result.stdout.splitlines():
            if '=' not in line:
                continue
            k, v = line.split('=', 1)
            info[k] = v

        # CPU, memory, threads via ps (ignore errors)
        cpu = mem = threads = 0
        try:
            proc_name = svc.replace('.service', '')
            ps_result = subprocess.run(
                ['ps', '-C', proc_name, '-o', 'pcpu,pmem,nlwp', '--no-headers'],
                capture_output=True,
                text=True
            ).stdout.strip()
            if ps_result:
                for line in ps_result.splitlines():
                    parts = line.split()
                    if len(parts) == 3:
                        cpu += float(parts[0])
                        mem += float(parts[1])
                        threads += int(parts[2])
        except:
            pass

        # Restart count: fallback to 0 if not available
        restart_count = 0
        try:
            restart_count = int(info.get("NRestarts", 0))
        except ValueError:
            pass

        # Optional: you can compute "real" restart count using journalctl, but this is heavier
        services.append({
            "name": svc,
            "status": info.get("ActiveState", "unknown"),
            "sub": info.get("SubState", ""),
            "cpu": round(cpu, 2),
            "memory": round(mem, 2),
            "threads": threads,
            "uptime": info.get("ActiveEnterTimestamp", ""),
            "restart_count": restart_count,
        })

    return services

@app.route("/api/services")
def services_endpoint():
    return jsonify(get_systemd_services())

if __name__ == "__main__":
    app.run(debug=True)
