#!/bin/bash
set -Ceuo pipefail
cd "$(dirname "$0")"
. ./conf/operation_tools_conf.sh
. ./common/common_functins.sh
function catch() {
  log "Exception"
}
trap catch ERR
TODAY="$(date --date '1 day ago' "+%Y%m%d")""000000"
if [ -n "$(last -s $TODAY | head -1)" ]; then
  log "catch login log"
  txt=$(last -s $TODAY | tr "\n" "@")
  echo $txt
  notify_cps "WARN" "$txt"
fi