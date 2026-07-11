import psycopg2
import bcrypt
import uuid
import datetime

# Connection parameters
conn = psycopg2.connect(
    dbname="edtech_db",
    user="edtech_user",
    password="edtech_pass",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

password = b"Demo@1234"
hashed = bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')

users = [
    ('pesquisador.demo@unb.br', 'Pesquisador Demo', 'RESEARCHER'),
    ('orientador.demo@unb.br', 'Orientador Demo', 'ADVISOR'),
    ('auditor.demo@unb.br', 'Auditor Demo', 'AUDITOR')
]

for email, name, role in users:
    uid = str(uuid.uuid4())
    now = datetime.datetime.now()
    inst_id = str(uuid.uuid4())
    cur.execute(
        "INSERT INTO users (id, name, email, password_hash, role, active, mfa_enabled, deleted, created_at, updated_at, institution_id) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) "
        "ON CONFLICT (email) DO NOTHING",
        (uid, name, email, hashed, role, True, False, False, now, now, inst_id)
    )

conn.commit()
cur.close()
conn.close()
print("Demo users populated successfully!")
