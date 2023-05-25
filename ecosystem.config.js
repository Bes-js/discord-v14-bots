let five = [
  {
    name: "Visor/Main",
    namespace: "Five So Beş",
    script: 'beş.js',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./Supervisor/"
  },
  {
    name: "Guards",
    namespace: "Five So Beş",
    script: 'beş.js',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./Shields"
  },
  {
    name: "Room",
    namespace: "Five So Beş",
    script: 'beş.js',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./Rooms"
  },
  {
    name: "Welcome",
    namespace: "Five So Beş",
    script: 'beş.js',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./Welcome"
  },
]
module.exports = {apps: five}
