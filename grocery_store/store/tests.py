from collections import deque

def find_optimal_allocation(labs, students):
    """
    Finds the optimal allocation of students and instructor to labs.

    Args:
        labs: A 2D list representing the capacity of each lab.
        students: The total number of students.

    Returns:
        The minimum distance between the instructor and the farthest student, or -1 if allocation is not possible.
    """

    rows, cols = len(labs), len(labs[0])
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

    # Find the lab with maximum capacity for the instructor
    max_capacity = 0
    instructor_row, instructor_col = 0, 0
    for i in range(rows):
        for j in range(cols):
            if labs[i][j] > max_capacity:
                max_capacity = labs[i][j]
                instructor_row, instructor_col = i, j

    # Allocate students
    queue = deque([(instructor_row, instructor_col)])
    visited = set()
    while queue and students > 0:
        row, col = queue.popleft()
        if (row, col) not in visited:
            visited.add((row, col))
            labs[row][col] -= 1
            students -= 1
            for dr, dc in directions:
                new_row, new_col = row + dr, col + dc
                if 0 <= new_row < rows and 0 <= new_col < cols and labs[new_row][new_col] > 0:
                    queue.append((new_row, new_col))

    # Check if all students are allocated
    if students > 0:
        return -1

    # Calculate the maximum distance
    max_distance = 0
    for i in range(rows):
        for j in range(cols):
            if labs[i][j] == 0:
                max_distance = max(max_distance, max(abs(i - instructor_row), abs(j - instructor_col)))

    return max_distance

# Get input
# T = int(input())
T = 1
N, M, K = 1, 7, 5
labs = [[2, 1, 0, 1, 3, 0, 1]]
for _ in range(T):
    # N, M, K = map(int, input().split())
    # labs = [list(map(int, input().split())) for _ in range(N)]
    result = find_optimal_allocation(labs, K)
    print(result)