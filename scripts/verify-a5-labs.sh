#!/usr/bin/env bash
# Verifies Lab 5 REST endpoints used by grading.txt (run with API server up).
# Usage: ./scripts/verify-a5-labs.sh [BASE_URL]
# Default BASE_URL: http://localhost:4000

set -euo pipefail

BASE="${1:-http://localhost:4000}"
BASE="${BASE%/}"

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

expect_eq() {
  local name="$1"
  local got="$2"
  local want="$3"
  if [[ "$got" != "$want" ]]; then
    fail "$name: expected '$want', got '$got'"
  fi
  echo "OK: $name"
}

echo "Using API base: $BASE"
echo ""

# Welcome
WELCOME=$(curl -sf "$BASE/lab5/welcome") || fail "GET /lab5/welcome"
[[ "$WELCOME" == *"Welcome"* ]] || fail "welcome message unexpected: $WELCOME"
echo "OK: GET /lab5/welcome"

# Path params 34 / 23
expect_eq "path add 34+23" "$(curl -sf "$BASE/lab5/add/34/23")" "57"
expect_eq "path subtract" "$(curl -sf "$BASE/lab5/subtract/34/23")" "11"
expect_eq "path multiply" "$(curl -sf "$BASE/lab5/multiply/34/23")" "782"
expect_eq "path divide" "$(curl -sf "$BASE/lab5/divide/34/23")" "1.4782608695652173"

# Query calculator
expect_eq "query add" "$(curl -sf "$BASE/lab5/calculator?operation=add&a=34&b=23")" "57"
expect_eq "query subtract" "$(curl -sf "$BASE/lab5/calculator?operation=subtract&a=34&b=23")" "11"
expect_eq "query multiply" "$(curl -sf "$BASE/lab5/calculator?operation=multiply&a=34&b=23")" "782"
expect_eq "query divide" "$(curl -sf "$BASE/lab5/calculator?operation=divide&a=34&b=23")" "1.4782608695652173"

# Objects
curl -sf "$BASE/lab5/assignment" | grep -q '"title"' || fail "GET /lab5/assignment JSON"
echo "OK: GET /lab5/assignment"
curl -sf "$BASE/lab5/assignment/title" | grep -q '.' || fail "GET /lab5/assignment/title"
echo "OK: GET /lab5/assignment/title"
curl -sf "$BASE/lab5/module" | grep -q '"name"' || fail "GET /lab5/module"
echo "OK: GET /lab5/module"
curl -sf "$BASE/lab5/module/name" | grep -q '.' || fail "GET /lab5/module/name"
echo "OK: GET /lab5/module/name"

# Arrays
curl -sf "$BASE/lab5/todos" | grep -q '\[' || fail "GET /lab5/todos"
echo "OK: GET /lab5/todos"
curl -sf "$BASE/lab5/todos/1" | grep -q '"id"' || fail "GET /lab5/todos/1"
echo "OK: GET /lab5/todos/1"
curl -sf "$BASE/lab5/todos?completed=true" | grep -q '\[' || fail "GET completed todos"
echo "OK: GET /lab5/todos?completed=true"

CODE=$(curl -s -o /tmp/a5_del_1234.json -w "%{http_code}" -X DELETE "$BASE/lab5/todos/1234")
expect_eq "DELETE missing todo status" "$CODE" "404"
grep -q "Unable to find todo" /tmp/a5_del_1234.json || fail "DELETE 1234 body should mention missing todo"
echo "OK: DELETE /lab5/todos/1234 -> 404"

echo ""
echo "All Lab 5 API checks passed."
