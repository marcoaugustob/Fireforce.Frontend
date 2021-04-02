docker image rm fcopel.portal.frontend
docker build -t fcopel.portal.frontend:latest -f .\FCopel.Portal.FrontEnd\Dockerfile-HM .\FCopel.Portal.FrontEnd
docker save -o ./fcopel.portal.frontend.tar fcopel.portal.frontend
