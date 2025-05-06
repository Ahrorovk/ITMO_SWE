from curl_cffi import requests
import asyncio

eventId = "282b31e2-2044-4eeb-841e-c2e9a27c3f4c"
problemId = "195dbf62-a69d-4f9f-8a20-9ce140173198"
url = 'https://xn--c1aejlld.xn--p1ai/api/problems/check-answer'
access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5OWU4NGJkLWQyYjMtNGZkMi05YTkxLWMxNDAwMzM5ODEzMSIsInJvbGUiOiJTdHVkZW50IiwibmJmIjoxNzQ2MTk5OTc2LCJleHAiOjE3NDY4MDQ3NzYsImlhdCI6MTc0NjE5OTk3NiwiaXNzIjoiaHR0cHM6Ly9nZW9saW4ucnUiLCJhdWQiOiJodHRwczovL2dlb2xpbi5ydSJ9.e1KS2G1Gkc1cAYhR3vyjgbL-968G82YW5UzkLjD7BwQ"
BATCH_SIZE = 50

headers = {
    'accept': '*/*',
    'accept-language': 'ru,en;q=0.9,tg;q=0.8',
    'authorization': f'Bearer {access_token}',
    'content-type': 'application/json',
    'origin': 'https://xn--c1aejlld.xn--p1ai',
    'referer': f'https://xn--c1aejlld.xn--p1ai/student/tasks/{eventId}',
    'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "YaBrowser";v="24.10", "Yowser";v="2.5"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 YaBrowser/24.10.0.0 Safari/537.36',
}


async def send_request(ans: str) -> bool:
    json_data = {
        'eventId': eventId,
        'problemId': problemId,
        'answer': ans,
    }
    async with requests.AsyncSession() as session:
        response = await session.put(url, headers=headers, json=json_data)
        json_response = response.json()
        if json_response.get("points") == 1:
            print(f"Correct answer: {ans}")
            return True
        print(f"Wrong answer: {ans}")
        return False


async def process_batch(batch):
    tasks = [send_request(str(ans)) for ans in batch]
    results = await asyncio.gather(*tasks)
    if any(results):
        print("Exiting after correct answer found.")
        exit()


async def floats():
    total_answers = 30
    for numerator in range(1, total_answers + 1):
        batch = []
        for denominator in range(2, total_answers + 2):
            batch.append(f"{numerator}/{denominator}")
            batch.append(f"-{numerator}/{denominator}")
            if len(batch) == BATCH_SIZE:
                await process_batch(batch)
                batch = []
        if batch:
            await process_batch(batch)


async def integers():
    total_answers = 1000
    batch = []
    for num in range(total_answers+1):
        batch.append(num)
        batch.append(-num)
        if len(batch) == BATCH_SIZE:
            await process_batch(batch)
            batch = []
        if batch:
            await process_batch(batch)


async def floats_dots():
    total_answers = 100
    batch = []
    for num in range(0, (total_answers * 100)+1):
        batch.append(num/100)
        batch.append(-num/100)
        if len(batch) == BATCH_SIZE:
            await process_batch(batch)
            batch = []
        if batch:
            await process_batch(batch)


async def main():
    await integers()
    # await floats()
    # await floats_dots()


asyncio.run(main())
