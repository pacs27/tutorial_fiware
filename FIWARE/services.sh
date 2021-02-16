#!/bin/bash

set -e

if (($# != 1)); then
	echo "Illegal number of parameters"
	echo "usage: services [create|start|startDev|stop]"
	exit 1
fi

loadData() {
	echo ""

	printf "⏳ Loading context data "

	echo ""
	waitForOrion
	echo ""
	echo "Calling orion-data.sh"
	./sh_files/orion-data.sh

	echo ""
	waitForQuantumLeap
	echo ""
	echo "Calling quantumLeap-sub.sh"
	./sh_files/quantumleap-sub.sh

	echo ""
	waitForIoTAgent
	echo ""
	echo "Calling provision-devices.sh"
	./sh_files/provision-devices.sh

}

stoppingContainers() {
	echo "Stopping containers"
	docker-compose --log-level ERROR -p fiware down -v --remove-orphans
}

displayServices() {
	echo ""
	docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" --filter name=fiware-*
	echo ""
}

waitForMongo() {
	echo -e "\n⏳ Waiting for \033[1mMongoDB\033[0m to be available\n"
	while ! [ $(docker inspect --format='{{.State.Health.Status}}' db-mongo) == "healthy" ]; do
		sleep 1
	done
}

waitForOrion() {
	echo -e "\n⏳ Waiting for \033[1;34mOrion\033[0m to be available\n"

	while ! [ $(docker inspect --format='{{.State.Health.Status}}' fiware-orion) == "healthy" ]; do
		echo -e "Context Broker HTTP state: " $(curl -s -o /dev/null -w %{http_code} 'http://localhost:1026/version') " (waiting for 200)"
		sleep 1
	done
}

waitForIoTAgent() {
	echo -e "\n⏳ Waiting for \033[1;36mIoT-Agent\033[0m to be available\n"
	while ! [ $(docker inspect --format='{{.State.Health.Status}}' fiware-iot-agent) == "healthy" ]; do
		echo -e "IoT Agent HTTP state: " $(curl -s -o /dev/null -w %{http_code} 'http://localhost:4041/version') " (waiting for 200)"
		sleep 1
	done
}

waitForQuantumLeap() {
	echo -e "\n⏳ Waiting for \033[1;36mQuantumLeap\033[0m to be available\n"
	while ! [ $(docker inspect --format='{{.State.Health.Status}}' fiware-quantumleap) == "healthy" ]; do
		echo -e "Quantum Leap HTTP state: " $(curl -s -o /dev/null -w %{http_code} 'http://localhost:8668/version') " (waiting for 200)"
		sleep 1
	done
}

waitForKeyrock() {
	echo -e "⏳ Waiting for \033[1;31mKeyrock\033[0m to be available\n"

	while [ $(curl -s -o /dev/null -w %{http_code} 'http://localhost:3005/version') -eq 000 ]; do
		echo -e "Keyrock HTTP state: " $(curl -s -o /dev/null -w %{http_code} 'http://localhost:3005/version') " (waiting for 200)"
		sleep 5
	done
	echo -e " \033[1;32mdone\033[0m"
}

waitForSecureKeyrock() {
	echo -e "⏳ Waiting for \033[1;31mKeyrock HTTPS\033[0m to be available\n"

	while [ $(curl -k -s -o /dev/null -w %{http_code} 'https://localhost:3443/version') -eq 000 ]; do
		echo -e "Keyrock HTTP state: " $(curl -k -s -o /dev/null -w %{http_code} 'https://localhost:3443/version') " (waiting for 200)"
		sleep 5
	done
	echo -e " \033[1;32mdone\033[0m"
}

command="$1"
case "${command}" in
"help")
	echo "usage: services  [create|start|startDev|stop]"
	;;
"start")
	stoppingContainers
	echo -e "Starting seven containers \033[1;34mOrion\033[0m, \033[1;34mQuantumLeap\033[0m, \033[1;36mIoT-Agent\033[0m, and \033[1mCrateDB\033[0m, \033[1mMongoDB\033[0m and \033[1mMySQL\033[0m databases."
	echo -e "- \033[1;34mOrion\033[0m is the context broker"
	echo -e "- \033[1;34mQuantumLeap\033[0m will write to CrateDB"
	echo -e "- \033[1;36mIoT-Agent\033[0m is configured for the UltraLight Protocol"
	echo -e "- \033[1;36mKeyRock\033[0m is used for authentication"
	echo -e "- \033[1;31mWilma\033[0m is a PEP Proxy around \033[1;34mOrion\033[0m"

	echo ""
	docker-compose --log-level ERROR -p fiware up -d --remove-orphans
	# loadData
	waitForKeyrock
	waitForSecureKeyrock
	displayServices
	echo -e "Now you can start using the server"
	;;
"stop")
	stoppingContainers
	;;
"create")
	echo "Pulling Docker images"
	docker-compose --log-level ERROR -p fiware pull
	;;
"startDev")
	stoppingContainers
	echo -e "Starting seven containers \033[1;34mOrion\033[0m, \033[1;34mQuantumLeap\033[0m, \033[1;36mIoT-Agent\033[0m, and \033[1mCrateDB\033[0m, \033[1mMongoDB\033[0m and \033[1mMySQL\033[0m databases."
	echo -e "- \033[1;34mOrion\033[0m is the context broker"
	echo -e "- \033[1;34mQuantumLeap\033[0m will write to CrateDB"
	echo -e "- \033[1;36mIoT-Agent\033[0m is configured for the UltraLight Protocol"
	echo -e "- \033[1;36mKeyRock\033[0m is used for authentication"
	echo -e "- \033[1;31mWilma\033[0m is a PEP Proxy around \033[1;34mOrion\033[0m"

	echo ""
	docker-compose --log-level ERROR -p fiware up -d --remove-orphans
	loadData
	waitForKeyrock
	# waitForSecureKeyrock
	displayServices
	;;
*)
	echo "Command not Found."
	echo "usage: services [create|start|startDev|stop]"
	exit 127
	;;
esac
