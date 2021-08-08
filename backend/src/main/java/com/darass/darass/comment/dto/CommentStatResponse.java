package com.darass.darass.comment.dto;

import com.darass.darass.comment.domain.Stat;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentStatResponse {

    private List<Stat> stats;
}
