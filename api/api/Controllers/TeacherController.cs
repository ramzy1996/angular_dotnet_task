using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Context;
using api.Model;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TeacherController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/TeacherModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherModel>>> GetTeacher()
        {
          if (_context.Teacher == null)
          {
              return NotFound();
          }
            return await _context.Teacher.ToListAsync();
        }

        // GET: api/TeacherModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherModel>> GetTeacherModel(string id)
        {
          if (_context.Teacher == null)
          {
              return NotFound();
          }
            var teacherModel = await _context.Teacher.FindAsync(id);

            if (teacherModel == null)
            {
                return NotFound();
            }

            return teacherModel;
        }

        // PUT: api/TeacherModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeacherModel(string id, TeacherModel teacherModel)
        {
            if (id != teacherModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(teacherModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TeacherModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TeacherModel>> PostTeacherModel(TeacherModel teacherModel)
        {
          if (_context.Teacher == null)
          {
              return Problem("Entity set 'AppDbContext.Teacher'  is null.");
          }
            _context.Teacher.Add(teacherModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeacherModel", new { id = teacherModel.Id }, teacherModel);
        }

        // DELETE: api/TeacherModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacherModel(string id)
        {
            if (_context.Teacher == null)
            {
                return NotFound();
            }
            var teacherModel = await _context.Teacher.FindAsync(id);
            if (teacherModel == null)
            {
                return NotFound();
            }

            _context.Teacher.Remove(teacherModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TeacherModelExists(string id)
        {
            return (_context.Teacher?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
