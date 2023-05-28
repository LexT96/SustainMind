
# SustainMind

## Run Locally

Clone the project

```bash
  git clone https://github.com/LexT96/SustainMind.git
```

Go to the project directory

```bash
  cd SustainMind
```

### Server

Navigate to the directory

```bash
  cd server
```

Fill your credentials according to the .env.example

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

### Frontend

Navigate to the directory

```bash
  cd web
```

Fill your credentials according to the .env.example

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

## Infrastructure
Pushing changes in the /web folder on the main branch will lead to a deployment on www.SustainMind.de (running on Netlify)

Pushing changes in the /server folder on the main branch will lead to a deployment on https://sustainmind.onrender.com/ (running on Render)

We use Clerk for authentication & user management




